export interface DocumentMetadata {
	title: string;
	description?: string;
	tags?: string[];
}

export interface DocumentUploadResponse {
	id: string;
	filename: string;
	title: string;
	size: number;
	type: string;
	metadata: DocumentMetadata;
	uploaded_at: string;
}

export async function uploadDocument(
	file: File,
	metadata: DocumentMetadata
): Promise<DocumentUploadResponse> {
	return {
		id: crypto.randomUUID(),
		filename: file.name,
		title: metadata.title,
		size: file.size,
		type: file.type,
		metadata,
		uploaded_at: new Date().toISOString()
	};
}
