import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/api/menu/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await fetch(
      `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=18.5288974&lng=73.8665321&restaurantId=${id}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/137.0.0.0 Safari/537.36",
          Accept: "application/json",
        },
      }
    );

    const text = await response.text();

    console.log("STATUS:", response.status);
    console.log(text.slice(0, 300));

    res.send(text);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});