export function createCSV(data: Record<string, any>[]): string {
  if (data.length === 0) {
    return "";
  }

  const headers = Object.keys(data[0]);

  function escapeCSV(value: any): string {
    if (value === null || value === undefined) {
      return "";
    }
    const stringValue = String(value);
    if (
      stringValue.includes(",") ||
      stringValue.includes('"') ||
      stringValue.includes("\n")
    ) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  }

  const csvRows = [
    headers.join(","),
    ...data.map((row) =>
      headers.map((header) => escapeCSV(row[header])).join(","),
    ),
  ];

  return csvRows.join("\n");
}
