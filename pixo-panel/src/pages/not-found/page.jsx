import { ArrowLeft, Home } from "lucide-react";
import { motion as Motion } from "motion/react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <title>صفحه پیدا نشد</title>
      <section>
        <div className="container px-4">
          <div className="flex-center main-height">
            <div className="grid items-center justify-center gap-6 text-center">
              <div className="grid gap-3 text-center">
                <h1 className="font-weight-bold text-lg md:text-4xl">
                  صفحه مورد نظر پیدا نشد!
                </h1>
                <p className="text-muted-foreground">
                  مطمعن شوید که آدرس درستی را وارد کرده اید
                </p>
              </div>
              <div className="z-[-1] -my-40">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="512"
                  height="512"
                  viewBox="0 0 50 50"
                  className="mx-auto size-60 md:size-full"
                >
                  <defs>
                    <linearGradient id="fadeStroke" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0a0a0a" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#fafafa" stopOpacity="1" />
                    </linearGradient>
                  </defs>

                  <Motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 3,
                      ease: "circIn",
                      damping: 100,
                    }}
                    stroke="url(#fadeStroke)"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.769 36.755a1 1 0 0 1-1-1v-8.321H2.687A2.16 2.16 0 0 1 .704 26.16a2.17 2.17 0 0 1 .328-2.345l7.898-9.189a2.16 2.16 0 0 1 2.413-.623 2.17 2.17 0 0 1 1.426 2.054v9.378h.549a1 1 0 1 1 0 2h-.549v8.321a1 1 0 0 1-1 .999m-1.194-20.893c-.071 0-.111.047-.129.067l-7.897 9.188a.18.18 0 0 0-.028.207c.05.108.138.108.166.108h8.082v-9.378c0-.036 0-.134-.122-.179a.3.3 0 0 0-.072-.013m36.377 20.893a1 1 0 0 1-1-1v-8.321h-8.083a2.16 2.16 0 0 1-1.983-1.274 2.17 2.17 0 0 1 .328-2.345l7.898-9.189c.603-.7 1.55-.944 2.413-.623a2.17 2.17 0 0 1 1.427 2.054v9.378h.548a1 1 0 1 1 0 2h-.548v8.321a1 1 0 0 1-1 .999m-1.194-20.893c-.071 0-.111.047-.129.067l-7.897 9.188a.18.18 0 0 0-.028.207c.05.108.138.108.166.108h8.083v-9.378c0-.036 0-.134-.122-.179a.3.3 0 0 0-.073-.013M25 36.829c-3.783 0-6.861-3.091-6.861-6.89V20.06c0-3.799 3.078-6.89 6.861-6.89s6.861 3.091 6.861 6.89v9.879c0 3.799-3.078 6.89-6.861 6.89m0-21.658c-2.681 0-4.861 2.193-4.861 4.89v9.879c0 2.696 2.181 4.89 4.861 4.89s4.861-2.193 4.861-4.89v-9.879c0-2.697-2.18-4.89-4.861-4.89"
                  ></Motion.path>
                </svg>
              </div>
              <div className="mt-20">
                <Link
                  to={"/"}
                  className="flex-center border-foreground hover:text-muted-foreground hover:border-muted-foreground mx-auto w-max gap-2 border-b border-solid pb-2 duration-200"
                >
                  <span>بازگشت به صفحه اصلی</span>
                  <ArrowLeft />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default NotFound;
