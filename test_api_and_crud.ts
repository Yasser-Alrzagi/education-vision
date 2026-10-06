import http from 'http';
import { app } from './src/server/app.js';
import { db } from './src/server/db.js';

async function runTests() {
  console.log('--- STARTING AUTOMATED TEST SUITE ---');

  // Start local test server on port 3001
  const server = http.createServer(app);
  await new Promise<void>((resolve) => server.listen(3001, () => resolve()));
  const baseUrl = 'http://127.0.0.1:3001';

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName}`);
      failed++;
    }
  }

  try {
    // 1. Health check
    const healthRes = await fetch(`${baseUrl}/api/health`);
    const healthData = await healthRes.json();
    assert(healthRes.status === 200 && healthData.status === 'ok', 'GET /api/health returns 200 OK');

    // 2. Auth: Bad credentials
    const badLoginRes = await fetch(`${baseUrl}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'wrong@example.com', password: 'wrongpassword' })
    });
    assert(badLoginRes.status === 401, 'POST /api/login with wrong credentials returns 401');

    // 3. Auth: Successful login
    const goodLoginRes = await fetch(`${baseUrl}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@educationvision.com', password: 'AdminPassword2026!' })
    });
    const goodLoginData = await goodLoginRes.json();
    assert(goodLoginRes.status === 200 && goodLoginData.success && typeof goodLoginData.token === 'string', 'POST /api/login with valid credentials returns 200 and JWT');
    const adminToken = goodLoginData.token;

    // 4. Auth: GET /api/auth/me with no token
    const noTokenMeRes = await fetch(`${baseUrl}/api/auth/me`);
    assert(noTokenMeRes.status === 401, 'GET /api/auth/me without token returns 401');

    // 5. Auth: GET /api/auth/me with invalid token
    const badTokenMeRes = await fetch(`${baseUrl}/api/auth/me`, {
      headers: { Authorization: 'Bearer bad.token.here' }
    });
    assert(badTokenMeRes.status === 401, 'GET /api/auth/me with invalid token returns 401');

    // 6. Auth: GET /api/auth/me with valid token
    const goodTokenMeRes = await fetch(`${baseUrl}/api/auth/me`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    const goodTokenMeData = await goodTokenMeRes.json();
    assert(goodTokenMeRes.status === 200 && goodTokenMeData.success && goodTokenMeData.user.email === 'admin@educationvision.com', 'GET /api/auth/me with valid JWT returns 200 and user');

    // 7. Security: Unauthorized CRUD
    const unauthPost = await fetch(`${baseUrl}/api/services`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'خدمة تجريبية', price: 100 })
    });
    assert(unauthPost.status === 401, 'POST /api/services without token returns 401');

    const unauthPut = await fetch(`${baseUrl}/api/services/prod-exams`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price: 100 })
    });
    assert(unauthPut.status === 401, 'PUT /api/services/:id without token returns 401');

    const unauthDelete = await fetch(`${baseUrl}/api/services/prod-exams`, {
      method: 'DELETE'
    });
    assert(unauthDelete.status === 401, 'DELETE /api/services/:id without token returns 401');

    // 8. Validation: Bad POST payloads (negative price, NaN, empty name)
    const badPricePost = await fetch(`${baseUrl}/api/services`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify({ name: 'خدمة تجريبية', price: -50 })
    });
    assert(badPricePost.status === 400, 'POST /api/services with negative price returns 400');

    const nanPricePost = await fetch(`${baseUrl}/api/services`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify({ name: 'خدمة تجريبية', price: 'not-a-number' })
    });
    assert(nanPricePost.status === 400, 'POST /api/services with NaN price returns 400');

    const noNamePost = await fetch(`${baseUrl}/api/services`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify({ price: 100 })
    });
    assert(noNamePost.status === 400, 'POST /api/services with missing name returns 400');

    // 9. Public Services: GET /api/services returns active services
    const publicServicesRes = await fetch(`${baseUrl}/api/services`);
    const publicServicesData = await publicServicesRes.json();
    assert(publicServicesRes.status === 200 && publicServicesData.success && Array.isArray(publicServicesData.data), 'GET /api/services returns list of services');
    const initialCount = publicServicesData.data.length;

    // Check translation_editing category in initial services
    const translationServices = publicServicesData.data.filter((s: any) => s.category === 'translation_editing');
    assert(translationServices.length >= 2, `translation_editing category services exist in DB (found ${translationServices.length})`);

    // 10. CRUD: Add new service
    const createRes = await fetch(`${baseUrl}/api/services`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify({
        name: 'خدمة تدقيق لغوي متقدمة للاختبار',
        price: 120,
        category: 'translation_editing',
        description: 'وصف الخدمة التجريبية للتأكد من عمل إضافة وتعديل وحذف الخدمات بشكل دائم',
        unitLabel: 'بحث'
      })
    });
    const createData = await createRes.json();
    assert(createRes.status === 201 && createData.success && createData.data.id, 'POST /api/services successfully adds new service');
    const createdId = createData.data.id;

    // Verify added service appears in public list
    const afterAddRes = await fetch(`${baseUrl}/api/services`);
    const afterAddData = await afterAddRes.json();
    const foundAdded = afterAddData.data.find((s: any) => s.id === createdId);
    assert(Boolean(foundAdded && foundAdded.price === 120), 'Newly added service is retrievable via GET /api/services');

    // 11. CRUD: Edit service price and description
    const updateRes = await fetch(`${baseUrl}/api/services/${createdId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify({
        price: 180,
        description: 'تم تحديث السعر والوصف بنجاح'
      })
    });
    const updateData = await updateRes.json();
    assert(updateRes.status === 200 && updateData.success && updateData.data.price === 180, 'PUT /api/services/:id successfully updates price');

    // 12. CRUD: Hide service (is_active: false)
    const hideRes = await fetch(`${baseUrl}/api/services/${createdId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify({
        is_active: false
      })
    });
    assert(hideRes.status === 200, 'PUT /api/services/:id successfully sets is_active: false');

    // Verify service is hidden from public API
    const afterHidePublic = await fetch(`${baseUrl}/api/services`);
    const afterHidePublicData = await afterHidePublic.json();
    const hiddenInPublic = afterHidePublicData.data.find((s: any) => s.id === createdId);
    assert(!hiddenInPublic, 'Hidden service does NOT appear in public GET /api/services');

    // Verify service IS returned to admin with all=true
    const adminAllRes = await fetch(`${baseUrl}/api/services?all=true`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    const adminAllData = await adminAllRes.json();
    const foundInAdmin = adminAllData.data.find((s: any) => s.id === createdId);
    assert(Boolean(foundInAdmin && foundInAdmin.is_active === false), 'Hidden service IS returned to admin via GET /api/services?all=true');

    // 13. CRUD: Show service again (is_active: true)
    const unhideRes = await fetch(`${baseUrl}/api/services/${createdId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify({
        is_active: true
      })
    });
    assert(unhideRes.status === 200, 'PUT /api/services/:id successfully re-enables service');

    // 14. CRUD: Delete service
    const deleteRes = await fetch(`${baseUrl}/api/services/${createdId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    assert(deleteRes.status === 200, 'DELETE /api/services/:id successfully deletes service');

    // Verify service is removed
    const afterDeleteRes = await fetch(`${baseUrl}/api/services`);
    const afterDeleteData = await afterDeleteRes.json();
    const foundDeleted = afterDeleteData.data.find((s: any) => s.id === createdId);
    assert(!foundDeleted, 'Deleted service no longer exists in GET /api/services');

    console.log(`\n--- TEST RESULTS: ${passed} PASSED, ${failed} FAILED ---`);
  } catch (err) {
    console.error('Fatal test error:', err);
    failed++;
  } finally {
    server.close();
  }

  process.exit(failed > 0 ? 1 : 0);
}

runTests();
