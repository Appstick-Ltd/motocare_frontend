import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ekywnjlxqbyxjagviqmx.supabase.co";
const publishableKey = "sb_publishable_Lu03N67DPFFaKEvtdy7PjA_6wZQewnT";

const supabase = createClient(supabaseUrl, publishableKey);

async function checkUserData() {
  console.log("=== Fetching User Profiles ===");
  const { data: profiles } = await supabase.from("profiles").select("*");
  console.log("Profiles:", JSON.stringify(profiles, null, 2));

  console.log("\n=== Fetching Vehicles ===");
  const { data: vehicles } = await supabase.from("vehicles").select("*");
  console.log("Vehicles:", JSON.stringify(vehicles, null, 2));

  console.log("\n=== Fetching Service Records ===");
  const { data: serviceRecords } = await supabase.from("service_records").select("*");
  console.log("Service Records:", JSON.stringify(serviceRecords, null, 2));

  console.log("\n=== Fetching Fuel Logs ===");
  const { data: fuelLogs } = await supabase.from("fuel_logs").select("*");
  console.log("Fuel Logs:", JSON.stringify(fuelLogs, null, 2));
}

checkUserData();
