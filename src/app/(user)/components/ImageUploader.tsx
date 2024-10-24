import React, { useState } from 'react';
import { uploadImage } from '@/lib/firebaseUtils';

export default function ImageUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Vui lòng chọn một file');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const url = await uploadImage(file);
      setImageUrl(url);
      setFile(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải ảnh lên');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />
      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
      >
        {loading ? 'Đang tải lên...' : 'Tải ảnh lên'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {imageUrl && (
        <div>
          <p>Ảnh đã được tải lên:</p>
          <img src={imageUrl} alt="Uploaded" className="mt-2 max-w-xs" />
        </div>
      )}
    </div>
  );
}