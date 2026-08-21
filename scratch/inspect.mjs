import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ekywnjlxqbyxjagviqmx.supabase.co";
const publishableKey = "sb_publishable_Lu03N67DPFFaKEvtdy7PjA_6wZQewnT";

const supabase = createClient(supabaseUrl, publishableKey);

async function inspect() {
  console.log("=== Testing Supabase Connection ===");

  const commonTables = [
    "profiles",
    "users",
    "user_roles",
    "roles",
    "vehicles",
    "cars",
    "motorcycles",
    "maintenance",
    "service_records",
    "maintenance_records",
    "subscriptions",
    "user_subscriptions",
    "plans",
    "payments",
    "transactions",
    "notifications",
    "app_content",
    "content",
    "settings",
    "app_settings",
    "fuel_logs",
    "fuel_history"
  ];

  console.log("\nChecking accessible public tables...");
  const tableResults = {};

  for (const table of commonTables) {
    try {
      const { data, error, count } = await supabase
        .from(table)
        .select("*", { count: "exact" })
        .limit(2);

      if (!error) {
        tableResults[table] = {
          accessible: true,
          count: count,
          sampleRow: data && data.length > 0 ? data[0] : null,
          columns: data && data.length > 0 ? Object.keys(data[0]) : "Empty table"
        };
      } else {
        tableResults[table] = {
          accessible: false,
          errorCode: error.code,
          errorMessage: error.message
        };
      }
    } catch (e) {
      tableResults[table] = { accessible: false, error: e.message };
    }
  }

  console.log(JSON.stringify(tableResults, null, 2));
}

inspect();
