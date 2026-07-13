import QRCode from "qrcode";

export async function generateQrSvg(text: string): Promise<string> {
  return QRCode.toString(text, { type: "svg", margin: 1 });
}

export async function generateQrPngDataUrl(text: string): Promise<string> {
  return QRCode.toDataURL(text, { margin: 1, width: 512 });
}
