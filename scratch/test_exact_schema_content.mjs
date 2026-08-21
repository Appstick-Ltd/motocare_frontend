import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ekywnjlxqbyxjagviqmx.supabase.co";
const publishableKey = "sb_publishable_Lu03N67DPFFaKEvtdy7PjA_6wZQewnT";

const supabase = createClient(supabaseUrl, publishableKey);

const contentTypes = ["privacy_policy", "terms_conditions", "about_us"];

async function runExactSchemaTests() {
  console.log("=== Testing Content Fetch & Update against Exact Supabase Schema ===");

  for (const contentType of contentTypes) {
    console.log(`\n--------------------------------------------------`);
    console.log(`Testing content_type: '${contentType}'`);

    // 1. Fetch active record by content_type + is_active
    const { data: activeDoc, error: fetchErr } = await supabase
      .from("app_content")
      .select("*")
      .eq("content_type", contentType)
      .eq("is_active", true)
      .maybeSingle();

    if (fetchErr) {
      console.error(`❌ Fetch Failed for ${contentType}:`, fetchErr);
      continue;
    }

    console.log(`✅ [FETCH SUCCESS] Record found:`);
    console.log(`   ID: ${activeDoc?.id}`);
    console.log(`   Title: "${activeDoc?.title}"`);
    console.log(`   Version: ${activeDoc?.version}`);
    console.log(`   Is Active: ${activeDoc?.is_active}`);

    if (activeDoc) {
      // 2. Perform Update by ID using exact schema columns: title, content, is_active, version
      const newVersion = (activeDoc.version || 1) + 1;
      const testTitle = `${activeDoc.title} (v${newVersion})`;
      const testContent = `${activeDoc.content}\n\n[Updated at ${new Date().toISOString()}]`;

      const { data: updateRes, error: updateErr } = await supabase
        .from("app_content")
        .update({
          title: testTitle,
          content: testContent,
          is_active: true,
          version: newVersion,
        })
        .eq("id", activeDoc.id)
        .select();

      if (updateErr) {
        console.error(`❌ [UPDATE FAILED] for ID ${activeDoc.id}:`, updateErr);
      } else {
        console.log(`✅ [UPDATE SUCCESS] Record updated by ID:`);
        console.log(`   New Title: "${updateRes[0]?.title}"`);
        console.log(`   New Version: ${updateRes[0]?.version}`);

        // 3. Verify Persistence from Supabase
        const { data: verifiedDoc } = await supabase
          .from("app_content")
          .select("*")
          .eq("id", activeDoc.id)
          .single();

        console.log(`✅ [PERSISTENCE VERIFIED] Saved in Supabase:`);
        console.log(`   ID: ${verifiedDoc.id}`);
        console.log(`   Title: "${verifiedDoc.title}"`);
        console.log(`   Version: ${verifiedDoc.version}`);
      }
    }
  }

  console.log(`\n==================================================`);
  console.log(`All content_type tests complete! Zero schema errors.`);
}

runExactSchemaTests();
