const htmlEscapes: Record<string, string> = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&#39;'
};

export function sanitizeHtml(value: string): string {
	return value.replace(/[&<>"']/g, (char) => htmlEscapes[char]);
}
