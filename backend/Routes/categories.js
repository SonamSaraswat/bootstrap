import express from "express";
const router = express.Router();
import { db } from "../db.js";

router.get('/all', (req, res) => {
  
  const query = `
    SELECT 
      mc.id AS main_id, mc.name AS main_name, mc.slug AS main_slug, mc.content AS main_content,
      sc.id AS sub_id, sc.name AS sub_name, sc.slug AS sub_slug, sc.content AS sub_content,
      ssc.id AS sub_sub_id, ssc.name AS sub_sub_name, ssc.slug AS sub_sub_slug, ssc.content AS sub_sub_content,
      sssc.id AS sub_sub_sub_id, sssc.name AS sub_sub_sub_name, sssc.slug AS sub_sub_sub_slug, sssc.content AS sub_sub_sub_content
    FROM main_categories mc
    LEFT JOIN sub_categories sc ON sc.main_category_id = mc.id
    LEFT JOIN sub_sub_categories ssc ON ssc.sub_category_id = sc.id
    LEFT JOIN sub_sub_sub_categories sssc ON sssc.sub_sub_category_id = ssc.id
    ORDER BY mc.id, sc.id, ssc.id, sssc.id
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('DB Error');
    }

    // Nest the categories
    const nested = {};

    results.forEach(row => {
      const mainId = row.main_id;
      if (!nested[mainId]) {
        nested[mainId] = {
          id: mainId,
          name: row.main_name,
          slug: row.main_slug,
          content: row.main_content,
          subcategories: {}
        };
      }

      if (row.sub_id) {
        const sub = nested[mainId].subcategories;
        if (!sub[row.sub_id]) {
          sub[row.sub_id] = {
            id: row.sub_id,
            name: row.sub_name,
            slug: row.sub_slug,
            content: row.sub_content,
            subsubcategories: {}
          };
        }

        if (row.sub_sub_id) {
          const subsub = sub[row.sub_id].subsubcategories;
          if (!subsub[row.sub_sub_id]) {
            subsub[row.sub_sub_id] = {
              id: row.sub_sub_id,
              name: row.sub_sub_name,
              slug: row.sub_sub_slug,
              content: row.sub_sub_content,
              subsubsubcategories: []
            };
          }

          if (row.sub_sub_sub_id) {
            subsub[row.sub_sub_id].subsubsubcategories.push({
              id: row.sub_sub_sub_id,
              name: row.sub_sub_sub_name,
              slug: row.sub_sub_sub_slug,
              content: row.sub_sub_sub_content,
            });
          }
        }
      }
    });

    // Convert nested object to array
    const response = Object.values(nested).map(main => ({
      ...main,
      subcategories: Object.values(main.subcategories).map(sub => ({
        ...sub,
        subsubcategories: Object.values(sub.subsubcategories)
      }))
    }));

    res.json(response);
  });
});

export default router;
