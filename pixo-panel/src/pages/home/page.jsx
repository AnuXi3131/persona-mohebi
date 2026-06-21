import { motion as Motion } from "motion/react";
import { Loader } from "../../components/ui";
import { useAuth } from "../../contexts";
import GridBackground from "./grid-background";
import Features from "./features";
import Welcome from "./welcome";

function Home() {
  const { loading } = useAuth();

  return (
    <section className="main-height flex-center overflow-hidden">
      <div className="relative container">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="absolute inset-0 top-1/2 z-[-1] h-[calc(100vh-12rem)] -translate-y-1/2">
              <GridBackground />
            </div>
            <Motion.div
              initial={{ opacity: 0, filter: "blur(6px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.3, ease: "easeIn", delay: 1.2 }}
              className="grid-items-2 grid items-center gap-6"
            >
              <Welcome />
              <Features />
            </Motion.div>
          </>
        )}
      </div>
    </section>
  );
}
export default Home;
