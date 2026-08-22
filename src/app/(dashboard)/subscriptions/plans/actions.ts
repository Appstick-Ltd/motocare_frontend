"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdminSession } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";

function isValidUUID(str: string) {
  return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(str);
}

export async function updateSubscriptionPricingAction(
  id: string,
  payload: {
    currency_code: string;
    currency_symbol: string;
    free_price: number;
    standard_price: number;
    premium_price: number;
    is_active: boolean;
  }
) {
  try {
    await requireAdminSession();
    const adminSupabase = createAdminClient();

    const updateData = {
      currency_code: payload.currency_code.toUpperCase(),
      currency_symbol: payload.currency_symbol,
      free_price: Number(payload.free_price),
      standard_price: Number(payload.standard_price),
      premium_price: Number(payload.premium_price),
      is_active: payload.is_active,
      updated_at: new Date().toISOString(),
    };

    let updateSuccess = false;

    // 1. If valid UUID, try updating by ID first
    if (isValidUUID(id)) {
      const { data: updatedRows, error } = await adminSupabase
        .from("subscription_pricing")
        .update(updateData)
        .eq("id", id)
        .select();

      if (!error && updatedRows && updatedRows.length > 0) {
        updateSuccess = true;
      }
    }

    // 2. If ID match didn't succeed (or ID was fallback UUID), try updating by currency_code
    if (!updateSuccess) {
      const { data: updatedRows, error: codeErr } = await adminSupabase
        .from("subscription_pricing")
        .update(updateData)
        .eq("currency_code", payload.currency_code.toUpperCase())
        .select();

      if (!codeErr && updatedRows && updatedRows.length > 0) {
        updateSuccess = true;
      }
    }

    // 3. If row doesn't exist in Supabase yet, insert new row into Supabase
    if (!updateSuccess) {
      const { error: insertErr } = await adminSupabase
        .from("subscription_pricing")
        .insert({
          currency_code: payload.currency_code.toUpperCase(),
          currency_symbol: payload.currency_symbol,
          free_price: Number(payload.free_price),
          standard_price: Number(payload.standard_price),
          premium_price: Number(payload.premium_price),
          is_active: payload.is_active,
        });

      if (insertErr) {
        console.error("Failed to insert subscription_pricing record:", insertErr.message);
        return { success: false, error: insertErr.message };
      }
    }

    revalidatePath("/subscriptions/plans");
    revalidatePath("/subscriptions");
    return { success: true };
  } catch (err: any) {
    console.error("updateSubscriptionPricingAction error:", err);
    return { success: false, error: err.message || "Failed to update pricing" };
  }
}

export async function addSubscriptionPricingAction(payload: {
  currency_code: string;
  currency_symbol: string;
  free_price: number;
  standard_price: number;
  premium_price: number;
  is_active: boolean;
}) {
  try {
    await requireAdminSession();
    const adminSupabase = createAdminClient();

    const insertData = {
      currency_code: payload.currency_code.toUpperCase(),
      currency_symbol: payload.currency_symbol,
      free_price: Number(payload.free_price),
      standard_price: Number(payload.standard_price),
      premium_price: Number(payload.premium_price),
      is_active: payload.is_active,
    };

    const { error } = await adminSupabase
      .from("subscription_pricing")
      .insert(insertData);

    if (error) {
      console.error("Failed to insert subscription_pricing record:", error.message);
      return { success: false, error: error.message };
    }

    revalidatePath("/subscriptions/plans");
    revalidatePath("/subscriptions");
    return { success: true };
  } catch (err: any) {
    console.error("addSubscriptionPricingAction error:", err);
    return { success: false, error: err.message || "Failed to add pricing" };
  }
}

export async function deleteSubscriptionPricingAction(id: string) {
  try {
    await requireAdminSession();
    const adminSupabase = createAdminClient();

    if (isValidUUID(id)) {
      const { error } = await adminSupabase.from("subscription_pricing").delete().eq("id", id);

      if (error) {
        console.error("Failed to delete subscription_pricing record:", error.message);
        return { success: false, error: error.message };
      }
    }

    revalidatePath("/subscriptions/plans");
    revalidatePath("/subscriptions");
    return { success: true };
  } catch (err: any) {
    console.error("deleteSubscriptionPricingAction error:", err);
    return { success: false, error: err.message || "Failed to delete pricing" };
  }
}
