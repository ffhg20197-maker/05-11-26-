const message = "GitHub Actions + Docker: контейнер запущен успешно.";

function getStatus() {
  return {
    status: "ok",
    runtime: process.version,
    environment: process.env.NODE_ENV || "not-set",
    message,
  };
}

if (require.main === module) {
  console.log(JSON.stringify(getStatus(), null, 2));
}

module.exports = { getStatus };
