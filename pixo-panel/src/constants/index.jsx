import {
  Settings,
  User,
  Briefcase,
  Layers,
  MessageSquare,
  Image,
  FileText,
  IdCard,
  Contact,
  LayoutDashboard,
  Heading,
  Package,
} from "lucide-react";

const menu = [
  {
    path: "/admin/install",
    label: "نصب",
    icon: <Package size={20} />,
  },
  {
    path: "/admin/dashboard",
    label: "داشبورد",
    icon: <LayoutDashboard size="20" />,
  },
  {
    path: "/admin/hero",
    label: "هیرو سکشن",
    icon: <Heading size="20" />,
  },
  {
    path: "/admin/about",
    label: "درباره من",
    icon: <User size="20" />,
  },
  {
    path: "/admin/services",
    label: "خدمات",
    icon: <Briefcase size="20" />,
  },
  {
    path: "/admin/gallery",
    label: "گالری",
    icon: <Image size="20" />,
  },
  {
    path: "/admin/experience",
    label: "تجربیات",
    icon: <Layers size="20" />,
  },
  {
    path: "/admin/testimonials",
    label: "نظرات کاربران",
    icon: <MessageSquare size="20" />,
  },
  {
    path: "/admin/contact",
    label: "فرم تماس",
    icon: <Contact size="20" />,
  },
  {
    path: "/admin/blog",
    label: "وبلاگ",
    icon: <FileText size="20" />,
  },
  {
    path: "/admin/profile",
    label: "تنظیمات پروفایل",
    icon: <IdCard size="20" />,
  },
  {
    path: "/admin/settings",
    label: "تنظیمات سایت",
    icon: <Settings size="20" />,
  },
];

export { menu };
