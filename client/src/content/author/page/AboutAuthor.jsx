import { useOutletContext } from "react-router-dom";

const AboutAuthor = () => {

  const { authorDesc } = useOutletContext()

  if (!authorDesc || authorDesc === "") {
    return <div className="text-center mt-16 text-2xl">author has no info</div>
  }

  return <div className="mt-5" dangerouslySetInnerHTML={{ __html: authorDesc }} />

};

export default AboutAuthor;
