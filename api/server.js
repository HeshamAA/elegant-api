// See https://github.com/typicode/json-server#module
const jsonServer = require('json-server');
const auth = require('json-server-auth');


const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// قواعد الحماية (يمكن تعديلها حسب الجداول)
const rules = auth.rewriter({
  "/register": "/users",
  "/login": "/login",
  "/api/*": "/$1",
  "/blog/:resource/:id/show": "/:resource/:id",
});



// وسطيات JSON Server
server.use(middlewares);

// تطبيق قواعد الحماية
server.use(rules);

// تطبيق مصادقة JSON Server Auth
server.use(auth);

// الراوتر
server.use(router);

// تشغيل السيرفر
server.listen(3000, () => {
  console.log('✅ JSON Server + Auth is running on port 3000');
});


// Export the Server API
module.exports = server
