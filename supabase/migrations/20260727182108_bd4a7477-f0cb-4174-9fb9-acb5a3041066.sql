CREATE POLICY "Visitantes podem enviar fotos de homenagem"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'homenagens');