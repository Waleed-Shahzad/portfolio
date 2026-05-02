import { renderToBuffer } from "@react-pdf/renderer";

import { ResumePDF } from "@/components/resume/ResumePDF";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const revalidate = false;

export async function GET() {
  const buffer = await renderToBuffer(<ResumePDF />);

  return new Response(buffer as unknown as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        'inline; filename="Waleed-Shahzad-Resume.pdf"',
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
