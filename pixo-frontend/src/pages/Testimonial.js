import { socialOptions } from "../constants";
import Loader from "../components/Loader";
import toast from "../utils/toast";
import { database, ID, storage } from "../services/appwrite/appwrite.config";
import { DATABASE_ID, STORAGE_ID, TESTIMONIALS_ID } from "../services/appwrite";

function Testimonial() {
  return /*html*/ `
        <section class="animate-fade-in relative">
          <div class="absolute bg-background z-[-1] bottom-0 right-1/2 translate-x-1/2 rotate-20 hidden md:block blur-3xl">
            <div style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" class="aspect-video w-288.75 bg-linear-to-b from-primary to-accent opacity-10"></div>
          </div>
          <div class="mt-30 md:mt-50">
                <div class="container px-4">
                    <div class="max-w-4xl mx-auto">
                        <div data-testimonial-form-container class="py-8 px-4 bg-surface backdrop-blur-2xl border border-solid border-border rounded-lg overflow-hidden">
                            <header class="flex flex-col gap-3 mb-10">
                                <h1 class="text-4xl md:text-5xl lg:text-6xl">ثبت نظر</h1>
                                <p class="text-muted text-lg">نظر خود را در مورد من بنویسید ✍...</p>
                            </header>
                            <form onsubmit="return false" data-form="testimonial">
                                <div data-form-grid class="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8">
                                    <div data-input-holder class="relative">
                                        <input data-input type="text" name="name"/>
                                        <span data-input-placeholder>نام شما</span>
                                    </div>
                                    <div data-input-holder class="relative">
                                        <input data-input type="url" name="social_link"/>
                                        <span data-input-placeholder>آیدی</span>
                                    </div>
                                    <div data-input-holder class="col-span-full relative">
                                        <c-select data-options='${JSON.stringify(socialOptions)}' data-placeholder="شبکه اجتماعی" data-id="social_name"></c-select>
                                    </div>
                                    <div data-input-holder class="col-span-full relative">
                                        <label for="file" data-input class="h-[4lh] border-dashed! flex justify-center items-center mb-2 cursor-none text-muted duration-100 hover:text-text">
                                          <span data-file-name class="line-clamp-1">آپلود عکس</span>
                                        </label>
                                        <input data-input type="file" name="file" id="file" accept="image/jpeg,image/png,image/gif" hidden/>
                                    </div>
                                    <div data-input-holder class="col-span-full relative">
                                        <textarea data-input name="comment" class="min-h-[4lh] max-h-[10lh] overflow-y-auto"></textarea>
                                        <span data-input-placeholder>پیام</span>
                                    </div>
                                    <div data-input-holder class="col-span-full mr-auto">
                                        <c-button class="text-white" data-text="ارسال" data-icon="arrow-forward-outline" data-border="var(--text-text)" data-background="var(--color-accent)"></c-button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function init() {
  const elements = {
    form: document.querySelector('[data-form="testimonial"]'),
    inputs: document.querySelectorAll("[data-input]"),
    placeholders: document.querySelectorAll("[data-input-placeholder]"),
    formsData: document.querySelectorAll("input[name] , textarea[name]"),
    select: document.querySelector("c-select"),
    fileNameDisplay: document.querySelector("[data-file-name]"),
  };

  const fileInput = elements.form.file;

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (file) {
      elements.fileNameDisplay.textContent = file.name;
    } else {
      elements.fileNameDisplay.textContent = "آپلود عکس";
    }
  });

  const formSubmitter = async (e) => {
    e.preventDefault();
    const isValid = inputValidator();

    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const isFileValid = fileValidator(file);
      if (!isFileValid) return;
    }

    if (isValid) {
      const formData = new FormData(elements.form);
      const data = Object.fromEntries(formData);
      Loader(elements.form.parentElement, true);

      try {
        const newFile = await storage.createFile({
          bucketId: STORAGE_ID,
          fileId: ID.unique(),
          file: data.file,
        });

        const newComment = await database.createDocument({
          databaseId: DATABASE_ID,
          collectionId: TESTIMONIALS_ID,
          documentId: ID.unique(),
          data: {
            title: data.name,
            social_link: data.social_link,
            social_name: data.social_name,
            comment: data.comment,
            file: newFile.$id,
            file_type: "image",
            approved: false,
          },
        });
        if (newComment.$id) {
          formResetor();
          toast("نظر شما با موفقیت ارسال شد", "bg-success");
        }
      } catch {
        toast("خطایی هنگام ارسال اطلاعات رخ داد", "bg-danger");
      } finally {
        Loader(elements.form.parentElement, false);
      }
    }
  };

  const inputSetup = () => {
    elements.inputs.forEach((item) => {
      const nextElm = item.nextElementSibling;
      if (!nextElm?.hasAttribute("data-input-placeholder")) return;

      item.addEventListener("focus", () => {
        if (item.value.trim() === "") {
          nextElm.classList.add("active");
        }
      });

      item.addEventListener("blur", () => {
        if (item.value.trim() === "") {
          nextElm.classList.remove("active");
        }
      });
    });
  };

  const placeholderSetup = () => {
    elements.placeholders.forEach((item) => {
      item.innerHTML = item.textContent
        .split("")
        .map(
          (char, i) =>
            /*html*/ `<span data-placeholder-char style="transition-delay:${i * 50}ms">${char}</span>`,
        )
        .join("");
    });
  };

  const formResetor = () => {
    elements.placeholders.forEach((item) => item.classList.remove("active"));
    elements.select.reset();
    elements.form.reset();
    elements.fileNameDisplay.textContent = "آپلود عکس";
  };

  const inputValidator = () => {
    const inputs = Array.from(elements.formsData);
    const isValid = inputs.every((input) => input.value.trim() !== "");

    if (!isValid) {
      toast("لطفا تمامی مقادیر را پر کنید", "bg-danger");
    }

    return isValid;
  };

  const fileValidator = (file) => {
    if (file instanceof File === false) {
      toast("فایل انتخاب شده معتبر نیست", "bg-danger");
      return false;
    }

    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSizeInBytes = 1024 ** 2; // 1MB
    if (!validTypes.includes(file.type)) {
      toast("فرمت فایل نامعتبر است", "bg-danger");
      return false;
    }
    if (file.size > maxSizeInBytes) {
      toast("حجم فایل نباید بیشتر از 1 مگابایت باشد", "bg-danger");
      return false;
    }
    return true;
  };

  inputSetup();
  placeholderSetup();
  elements.form.addEventListener("submit", formSubmitter);
}

export default {
  render: Testimonial,
  setup: init,
};
