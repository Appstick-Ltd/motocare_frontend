import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ekywnjlxqbyxjagviqmx.supabase.co";
const publishableKey = "sb_publishable_Lu03N67DPFFaKEvtdy7PjA_6wZQewnT";

const supabase = createClient(supabaseUrl, publishableKey);

async function deepProbe() {
  console.log("=== Deep Column Discovery ===");

  const dictionary = [
    "id", "user_id", "profile_id", "email", "name", "full_name", "first_name", "last_name",
    "phone", "mobile", "role", "user_role", "status", "is_active", "avatar", "avatar_url",
    "created_at", "updated_at", "deleted_at",
    "brand", "brand_name", "make", "model", "model_name", "year", "registration_number",
    "plate", "license_plate", "vin", "vehicle_type", "type", "category", "color", "fuel_type",
    "engine_number", "chassis_number",
    "service_type", "service_category", "service_name", "service_date", "date", "cost",
    "price", "total", "amount", "notes", "description", "details", "odometer", "odometer_km",
    "mileage", "garage_name", "vendor",
    "fuel_amount", "liters", "gallons", "price_per_unit", "total_price", "fuel_station", "station",
    "content_type", "slug", "title", "content", "version"
  ];

  const tables = ["profiles", "vehicles", "service_records", "fuel_logs", "app_content"];

  for (const table of tables) {
    console.log(`\nDiscovering columns for table '${table}'...`);
    const valid = [];
    for (const col of dictionary) {
      const { error } = await supabase.from(table).select(col).limit(0);
      if (!error) {
        valid.push(col);
      }
    }
    console.log(`  Discovered columns in '${table}':`, valid);
  }
}

deepProbe();
