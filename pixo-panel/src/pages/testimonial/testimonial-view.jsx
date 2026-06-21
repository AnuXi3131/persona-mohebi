import { Card, CardContent, Image, Label } from "../../components/ui";
import { storage } from "../../services/appwrite/appwrite.config";
import { STORAGE_ID } from "../../services/appwrite";

function TestimonialView({ data }) {
  const { formValues, fileId } = data || {};
  const { title, comment, social_name, social_link, approved } =
    formValues || {};

  const imageUrl = fileId
    ? storage.getFileDownload({ bucketId: STORAGE_ID, fileId })
    : null;

  return (
    <Card>
      <CardContent>
        <div className="grid gap-6">
          {imageUrl && (
            <div className="flex justify-center">
              <Image
                src={imageUrl}
                alt={title || "تصویر نظر دهنده"}
                className="border-border aspect-square w-32 rounded-lg border object-cover"
              />
            </div>
          )}

          <div className="grid gap-6">
            {title && (
              <div className="grid gap-2">
                <Label label={"عنوان"} />
                <p className="default-input rounded-lg">{title}</p>
              </div>
            )}

            {comment && (
              <div className="grid gap-2">
                <Label label={"نظر"} />
                <p className="default-input rounded-lg">{comment}</p>
              </div>
            )}

            {social_name && (
              <div className="grid gap-2">
                <Label label={"نام شبکه اجتماعی"} />
                <p className="default-input rounded-lg">{social_name}</p>
              </div>
            )}

            {social_link && (
              <div className="grid gap-2">
                <Label label={"لینک شبکه اجتماعی"} />
                <a
                  href={social_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="default-input rounded-lg break-normal break-all hover:underline"
                >
                  {social_link}
                </a>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Label label={"وضعیت:"} className={"flex-0"} />
              <span
                className={`flex-center rounded-full px-3 py-1 text-sm ${
                  approved
                    ? "bg-chart-2/20 text-chart-2"
                    : "bg-chart-3/20 text-chart-3"
                }`}
              >
                {approved ? "تایید شده" : "در انتظار تایید"}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default TestimonialView;
