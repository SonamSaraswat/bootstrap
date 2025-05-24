// src/components/ServicePage.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ServicePage = () => {
  const { mainId, subId, subSubId, subSubSubId } = useParams();
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
      let id = subSubSubId || subSubId || subId || mainId;
      const res = await axios.get(`http://localhost:5000/api/service/${id}`);
      setContent(res.data?.content || "<p>No content found.</p>");
    };
    fetchContent();
  }, [mainId, subId, subSubId, subSubSubId]);

  return (
    <div className="p-6" dangerouslySetInnerHTML={{ __html: content }} />
  );
};

export default ServicePage;
