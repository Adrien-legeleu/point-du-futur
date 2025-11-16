'use client';

import { useState, useRef } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Upload, X, Loader, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

type Props = {
  currentImage: string | null;
  onImageChange: (url: string | null) => void;
};

export default function ImageUpload({ currentImage, onImageChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validation
    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner une image');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image trop grande (max 5MB)');
      return;
    }

    setUploading(true);

    try {
      // Nom unique du fichier
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(7)}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload vers Supabase Storage
      const { data, error } = await supabase.storage
        .from('evenements')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) throw error;

      // Récupérer l'URL publique
      const {
        data: { publicUrl },
      } = supabase.storage.from('evenements').getPublicUrl(data.path);

      setPreview(publicUrl);
      onImageChange(publicUrl);
    } catch (error: any) {
      console.error('Erreur upload:', error);
      alert("Erreur lors de l'upload: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
        <ImageIcon className="w-4 h-4" />
        Image de l'événement
      </label>

      {preview ? (
        <div className="relative group">
          <Image
            src={preview}
            alt="Preview"
            width={800}
            height={400}
            className="w-full max-w-2xl h-64 object-cover rounded-xl border-2 border-gray-200"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <div className="relative">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={uploading}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-primary-500 transition-all ${
              uploading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {uploading ? (
              <div className="text-center">
                <Loader className="w-12 h-12 text-primary-500 animate-spin mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Upload en cours...</p>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium mb-2">
                  Cliquez pour sélectionner une image
                </p>
                <p className="text-sm text-gray-500">
                  PNG, JPG, WEBP jusqu'à 5MB
                </p>
              </div>
            )}
          </label>
        </div>
      )}
    </div>
  );
}
