import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ekywnjlxqbyxjagviqmx.supabase.co";
const publishableKey = "sb_publishable_Lu03N67DPFFaKEvtdy7PjA_6wZQewnT";

const supabase = createClient(supabaseUrl, publishableKey);

async function probeColumns() {
  console.log("=== Probing Column Definitions ===");

  const probes = [
    { table: "profiles", cols: ["id", "email", "full_name", "phone", "role", "avatar_url", "status", "created_at", "updated_at"] },
    { table: "vehicles", cols: ["id", "user_id", "brand", "model", "year", "license_plate", "vin", "vehicle_type", "type", "status", "created_at"] },
    { table: "service_records", cols: ["id", "vehicle_id", "user_id", "service_type", "category", "service_date", "cost", "price", "status", "notes", "odometer_km"] },
    { table: "fuel_logs", cols: ["id", "vehicle_id", "user_id", "fuel_amount", "amount", "cost", "total_price", "odometer_km", "date", "created_at"] },
  ];

  for (const p of probes) {
    console.log(`\nTesting table '${p.table}'...`);
    const validCols = [];
    const invalidCols = [];

    for (const col of p.cols) {
      const { error } = await supabase.from(p.table).select(col).limit(0);
      if (!error) {
        validCols.push(col);
      } else {
        invalidCols.push({ col, msg: error.message });
      }
    }

    console.log(`  Valid columns:`, validCols);
    if (invalidCols.length > 0) {
      console.log(`  Invalid/Missing columns:`, invalidCols.map(c => c.col));
    }
  }

  console.log("\nQuerying all rows from 'app_content'...");
  const { data: contentData } = await supabase.from("app_content").select("*");
  console.log(JSON.stringify(contentData, null, 2));
}

probeColumns();
