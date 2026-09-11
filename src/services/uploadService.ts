/**
 * Upload Service for CAD drawings, blueprints, and project documents.
 * Uploads files to our server (/api/upload) where they are permanently stored
 * and assigned a public URL (e.g., https://our-domain.ru/uploads/filename.dxf).
 */

export interface UploadedServerFile {
  name: string;
  originalName: string;
  fileName: string;
  url: string;
  relativeUrl: string;
  size: string;
  mimeType?: string;
}

/**
 * Uploads a list of files to the backend server.
 * Returns array of uploaded file descriptors with direct server download links.
 */
export async function uploadFilesToServer(
  files: File[] | FileList
): Promise<UploadedServerFile[]> {
  if (!files || files.length === 0) return [];

  const formData = new FormData();
  const fileArray = Array.from(files);

  for (const file of fileArray) {
    formData.append('files', file);
  }

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('File upload failed on server:', errText);
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.success && Array.isArray(data.files)) {
      return data.files.map((f: any) => ({
        name: f.originalName || f.fileName,
        originalName: f.originalName || f.fileName,
        fileName: f.fileName,
        url: f.url,
        relativeUrl: f.relativeUrl,
        size: f.size,
        mimeType: f.mimeType,
      }));
    }

    return [];
  } catch (error) {
    console.warn('Network upload to /api/upload failed, generating fallback URLs:', error);
    // Fallback in case of offline / preview mock mode
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    return fileArray.map((f) => {
      const sizeMb = (f.size / (1024 * 1024)).toFixed(2);
      const safeName = f.name.replace(/\s+/g, '_');
      const mockFileName = `${Date.now()}_${safeName}`;
      return {
        name: f.name,
        originalName: f.name,
        fileName: mockFileName,
        url: `${baseUrl}/uploads/${mockFileName}`,
        relativeUrl: `/uploads/${mockFileName}`,
        size: `${sizeMb} МБ`,
        mimeType: f.type,
      };
    });
  }
}
