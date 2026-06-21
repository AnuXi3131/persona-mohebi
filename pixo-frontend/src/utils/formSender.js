import emailjs from "@emailjs/browser";
import toast from "./toast";
import { getContactInfo } from "../services/api";

const { public_key } = await getContactInfo();

if (public_key) {
  emailjs.init({
    publicKey: public_key,
  });
} else {
  console.warn("کلید عمومی برای ارسال ایمیل تنظیم نشده");
}

async function formSender(templateParams = {}) {
  const { service_key, template_id } = await getContactInfo();

  if (!service_key && !template_id) {
    console.warn(
      "کلید سرویس و آیدی قالب تنظیم نشده است، لطفا از طریق پنل ادمین فرم تماس را تنظیم نمایید.",
    );
    return;
  }

  try {
    const response = await emailjs.send(
      service_key,
      template_id,
      templateParams,
    );
    if (response.status < 200 || response.status >= 300) {
      toast("ارسال فرم با خطا مواجه شد", "bg-danger");
      return { success: false };
    }
    toast("فرم با موفقیت ارسال شد", "bg-success");
    return { success: true };
  } catch (e) {
    toast("هنگام ارسال فرم خطایی رخ داد", "bg-danger");
    console.log(e.message);
    return { success: false };
  }
}

export default formSender;
