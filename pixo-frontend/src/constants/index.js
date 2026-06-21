import Home from "../pages/Home";
import About, { setup as aboutSetup } from "../pages/About";
import Services, { setup as servicesSetup } from "../pages/Services";
import Gallery from "../pages/Gallery";
import Blog from "../pages/Blog";
import BlogPostPage from "../components/blog/BlogPostPage";
import Testimonial from "../pages/Testimonial";
import Contact from "../pages/Contact";
import { getSettings } from "../services/api";
import { getFileUrl } from "../utils/getFileUrl";

const brandName = {
  fa: await getSettings().then((res) => {
    return res.brand_name || "پرسونا";
  }),
};

const logo = {
  path: "/",
  src: await getSettings().then((res) => {
    const logoSrc = getFileUrl(res.logo);
    return logoSrc || "./logo.svg";
  }),
  content: Home,
};

const routes = [
  {
    key: "about",
    path: "/about",
    name: "درباره من",
    content: About,
    init: aboutSetup,
  },
  {
    key: "services",
    path: "/services",
    name: "خدمات",
    content: Services,
    init: servicesSetup,
  },
  {
    key: "gallery",
    path: "/gallery",
    name: "گالری",
    content: Gallery.render,
    init: Gallery.setup,
  },
  {
    key: "blog",
    path: "/blog",
    name: "بلاگ",
    content: Blog.render,
    init: Blog.setup,
  },
  {
    path: "/blog/:id",
    name: "جزئیات مطلب",
    content: (params) => BlogPostPage(params.id),
    hidden: true,
  },
  {
    key: "testimonial",
    path: "/testimonials",
    name: "ثبت نظر",
    content: Testimonial.render,
    init: Testimonial.setup,
  },
  {
    key: "contact",
    path: "/contact",
    name: "تماس با من",
    content: Contact,
  },
];

const themeIcons = [
  {
    name: "light",
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun-icon lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
    `,
  },
  {
    name: "dark",
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon-icon lucide-moon"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg>
    `,
  },
  {
    name: "system",
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-monitor-icon lucide-monitor"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>
    `,
  },
];

const galleryCategories = [
  {
    title: "عکس ها",
    value: "images",
  },
  {
    title: "ویدیو ها",
    value: "videos",
  },
  {
    title: "صوت ها",
    value: "audios",
  },
];

const socialOptions = [
  {
    title: "اینستاگرام",
    value: "Instagram",
  },
  {
    title: "تلگرام",
    value: "Telegram",
  },
  {
    title: "وبسایت",
    value: "Website",
  },
];

const contactQuestions = [
  {
    key: "email_number",
    text: "برای شروع ",
    postfix: "ایمیل یا شماره تلفن",
    complete: false,
    value: "",
  },
  {
    key: "name",
    text: "عالی و ",
    postfix: "اسمتون",
    complete: false,
    value: "",
  },
  {
    key: "message",
    text: "چطور میتونم کمکتون کنم ؟ ",
    postfix: "پیام شما",
    complete: false,
    value: "",
  },
];

const shareOptions = [
  {
    name: "فیسبوک",
    icon: "logo-facebook",
    link: (url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: "تلگرام",
    icon: "paper-plane-outline",
    link: (url, title) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(
        title,
      )}`,
  },
  {
    name: "واتساپ",
    icon: "logo-whatsapp",
    link: (url, title) =>
      `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
  },
  {
    name: "لینکدین",
    icon: "logo-linkedin",
    link: (url) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url,
      )}`,
  },
];

export {
  brandName,
  logo,
  routes,
  themeIcons,
  galleryCategories,
  socialOptions,
  contactQuestions,
  shareOptions,
};
