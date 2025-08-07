import { supabase } from '../supabase/client';

// ✅ Fetch currently logged-in user
export const fetchUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw error;
  return user;
};

// ✅ Fetch products owned by a specific user
export const fetchUserProducts = async (userId) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

// ✅ Insert a new product (don't include `id`)
export const insertProduct = async (product) => {
  const { id, ...clean } = product;
  const { data, error } = await supabase
    .from('products')
    .insert([clean]);

  if (error) throw error;
  return data;
};

// ✅ Update a product by ID
export const updateProduct = async (product) => {
  const { id, ...rest } = product;
  const { data, error } = await supabase
    .from('products')
    .update(rest)
    .eq('id', id);

  if (error) throw error;
  return data;
};

// ✅ Delete a product by ID
export const deleteProduct = async (id) => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) throw error;
};
