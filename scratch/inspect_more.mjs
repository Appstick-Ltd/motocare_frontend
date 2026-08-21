import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ekywnjlxqbyxjagviqmx.supabase.co";
const publishableKey = "sb_publishable_Lu03N67DPFFaKEvtdy7PjA_6wZQewnT";

const supabase = createClient(supabaseUrl, publishableKey);

async function inspectMore() {
  const tableCandidates = [
    "profiles",
    "vehicles",
    "vehicle_types",
    "vehicle_brands",
    "brands",
    "service_records",
    "service_types",
    "service_categories",
    "fuel_logs",
    "subscriptions",
    "plans",
    "membership_plans",
    "payments",
    "transactions",
    "invoices",
    "notifications",
    "app_content",
    "audit_logs",
    "logs",
    "admin_users",
    "user_roles"
  ];

  console.log("=== Comprehensive Table Inspection ===");
  for (const table of tableCandidates) {
    const { data, error, count } = await supabase
      .from(table)
      .select("*", { count: "exact" })
      .limit(1);

    if (!error) {
      console.log(`✅ Table '${table}': EXISTS | Rows: ${count}`);
      if (data && data.length > 0) {
        console.log(`   Sample columns:`, Object.keys(data[0]));
        console.log(`   Sample row:`, JSON.stringify(data[0]));
      }
    } else if (error.code !== "PGRST205") {
      console.log(`⚠️ Table '${table}': RLS Protected / Query Error (${error.code}) - ${error.message}`);
    }
  }
}

inspectMore();
