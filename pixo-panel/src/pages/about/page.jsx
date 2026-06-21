import { PageHeader, Tabs } from "../../components/ui";
import AboutMe from "./about";
import Skills from "./skills";

const tabs = [
  { id: 1, label: "درباره من", key: "about" },
  { id: 2, label: "مهارت ها", key: "skills" },
];

const components = [
  { id: 1, component: <AboutMe /> },
  { id: 2, component: <Skills /> },
];

function About() {
  return (
    <section>
      <PageHeader
        pageTitle={"درباره من"}
        title={"درباره من"}
        sub={"بیوگرافی و مهارت های خود را اضافه کنید"}
      />
      <Tabs tabs={tabs} components={components} />
    </section>
  );
}

export default About;
