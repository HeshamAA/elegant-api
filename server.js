const jsonServer = require('json-server');
const auth = require('json-server-auth');


const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// ✨ قواعد الحماية
const rules = auth.rewriter({
  "/register": "/users",
  "/login": "/login",
  "/api/*": "/$1",
  "/blog/:resource/:id/show": "/:resource/:id",
});

// ✅ الترتيب مهم جداً

server.db = router.db; // ✅ هنا بنربط قاعدة البيانات بالسيرفر


server.use(middlewares);
server.use(rules);
server.use(auth);       // ⬅️ لازم auth تيجي قبل الراوتر
server.use(router);     // ⬅️ الراوتر في الآخر

server.listen(3000, () => {
  console.log("✅ JSON Server with Auth is running on port 3000");
});
