import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ekywnjlxqbyxjagviqmx.supabase.co";
const publishableKey = "sb_publishable_Lu03N67DPFFaKEvtdy7PjA_6wZQewnT";

const supabase = createClient(supabaseUrl, publishableKey);

async function testContentFlow() {
  console.log("=== 1. Fetching Existing App Content ===");
  const { data: initialData, error: fetchErr } = await supabase
    .from("app_content")
    .select("*");

  if (fetchErr) {
    console.error("Fetch Error:", fetchErr);
    return;
  }

  console.log(`Fetched ${initialData.length} content documents:`);
  initialData.forEach(item => {
    console.log(` - [${item.content_type}] Title: "${item.title}" (ID: ${item.id})`);
  });

  console.log("\n=== 2. Testing Update on 'privacy_policy' via .update().eq('content_type', ...) ===");
  const targetType = "privacy_policy";
  const updatedTitle = "MotoCare Privacy Policy (Verified)";
  const updatedBody = `# MotoCare Privacy Policy\n\nLast Updated: August 2026\n\nAt MotoCare, we prioritize user data confidentiality and vehicle telemetry security. All telemetry logs are encrypted using enterprise standards.`;

  const { data: updateData, error: updateErr } = await supabase
    .from("app_content")
    .update({
      title: updatedTitle,
      content: updatedBody,
      updated_at: new Date().toISOString()
    })
    .eq("content_type", targetType)
    .select();

  if (updateErr) {
    console.error("❌ Update Failed:", updateErr);
    return;
  }

  console.log("✅ Update Successful! Returned record:", updateData);

  console.log("\n=== 3. Verifying Persistence from Supabase ===");
  const { data: verifiedData, error: verifyErr } = await supabase
    .from("app_content")
    .select("*")
    .eq("content_type", targetType)
    .single();

  if (verifyErr) {
    console.error("❌ Verification Fetch Failed:", verifyErr);
    return;
  }

  console.log("✅ Persistence Verified! Saved in Supabase:");
  console.log("   Content Type:", verifiedData.content_type);
  console.log("   Title:", verifiedData.title);
  console.log("   Content Snippet:", verifiedData.content.slice(0, 80) + "...");
  console.log("   Updated At:", verifiedData.updated_at);
}

testContentFlow();
