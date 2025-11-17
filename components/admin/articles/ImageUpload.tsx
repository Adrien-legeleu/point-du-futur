'use client';

import { useState, useRef } from 'react';
import { Upload, Loader, X } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

interface ImageUploadProps {
  currentImage?: string;
  onImageUploaded: (url: string) => void;
}

export default function ImageUpload({
  currentImage,
  onImageUploaded,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage || '');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vérifier le type de fichier
    if (!file.type.startsWith('image/')) {
      setError('Le fichier doit être une image');
      return;
    }

    // Vérifier la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("L'image ne doit pas dépasser 5 MB");
      return;
    }

    setError('');
    setUploading(true);

    try {
      // Générer un nom de fichier unique
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()
        .toString(36)
        .substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload vers Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from('articles-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Obtenir l'URL publique
      const {
        data: { publicUrl },
      } = supabase.storage.from('articles-images').getPublicUrl(filePath);

      setPreview(publicUrl);
      onImageUploaded(publicUrl);
    } catch (err: any) {
      console.error('Erreur upload:', err);
      setError(err.message || "Erreur lors de l'upload");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview('');
    onImageUploaded('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          id="image-upload"
        />

        <label
          htmlFor="image-upload"
          className={`flex items-center gap-2 px-4 py-2 bg-white border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-primary-500 transition-colors ${
            uploading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {uploading ? (
            <>
              <Loader className="w-5 h-5 animate-spin text-primary-500" />
              <span className="text-sm font-medium text-gray-700">
                Upload en cours...
              </span>
            </>
          ) : (
            <>
              <Upload className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                Choisir une image
              </span>
            </>
          )}
        </label>

        {preview && (
          <button
            type="button"
            onClick={handleRemove}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Supprimer l'image"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {preview && (
        <div className="relative  overflow-hidden">
          <img
            src={preview}
            alt="Preview"
            className="h-auto max-w-32 rounded-xl object-cover"
            onError={(e) => {
              e.currentTarget.src = '/images/default-article.jpg';
            }}
          />
        </div>
      )}

      <p className="text-xs text-gray-500">
        Formats acceptés : JPG, PNG, GIF. Taille max : 5 MB
      </p>
    </div>
  );
}
