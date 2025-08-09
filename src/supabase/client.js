import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hevfodlnofgdyiesdprv.supabase.co'; // <-- STRING in quotes
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhldmZvZGxub2ZnZHlpZXNkcHJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyNTQyMjAsImV4cCI6MjA2OTgzMDIyMH0.mSHFGS6gJfa9Ww_yfRsgmFCBLmlJivEMG8nRA9rW-pw'; // <-- STRING in quotes

export const supabase = createClient(supabaseUrl, supabaseKey);
