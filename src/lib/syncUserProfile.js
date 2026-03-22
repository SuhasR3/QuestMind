/**
 * Upserts a row in `public.user_profiles` for the signed-in user so login
 * metadata (email, name, first/last login, login count) is stored in Postgres.
 */
export async function syncUserProfile(insforge, user) {
  if (!user?.id) return;

  const email = user.email ?? '';
  const displayName = user.profile?.name ?? user.name ?? null;
  const now = new Date().toISOString();

  const { data: existing, error: selectError } = await insforge.database
    .from('user_profiles')
    .select('user_id, login_count')
    .eq('user_id', user.id)
    .maybeSingle();

  if (selectError) {
    console.error('[QuestMind] user_profiles select failed:', selectError.message ?? selectError);
    return;
  }

  if (!existing) {
    const { error: insertError } = await insforge.database
      .from('user_profiles')
      .insert([
        {
          user_id: user.id,
          email,
          display_name: displayName,
          first_login_at: now,
          last_login_at: now,
          login_count: 1,
        },
      ])
      .select();

    if (insertError) {
      console.error('[QuestMind] user_profiles insert failed:', insertError.message ?? insertError);
    }
    return;
  }

  const nextCount = (existing.login_count ?? 0) + 1;
  const { error: updateError } = await insforge.database
    .from('user_profiles')
    .update({
      email,
      display_name: displayName,
      last_login_at: now,
      login_count: nextCount,
    })
    .eq('user_id', user.id)
    .select();

  if (updateError) {
    console.error('[QuestMind] user_profiles update failed:', updateError.message ?? updateError);
  }
}
