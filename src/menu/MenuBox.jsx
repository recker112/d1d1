import { Grid2 as Grid, Typography } from "@mui/material";

import { motion } from "motion/react";
import { useState } from "react";

export default function MenuBox({ setView }) {
  const [desition, setDesition] = useState(false);

  const handleView = (view) => {
    if (desition) return;
    setDesition(true);
    setTimeout(() => {
      setView(view);
    }, 2000);
  };

  return (
    <Grid container justifyContent="center" sx={{ mt: 4 }} spacing={20}>
      <Grid>
        <Typography variant="h3">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1.1, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            ¿Cuál es tú desición?
          </motion.div>
        </Typography>
      </Grid>
      <Grid container justifyContent="center" size={12}>
        <Grid>
          <Typography
            variant="h3"
            sx={{ color: desition ? "text.disabled" : "error.main", cursor: "pointer" }}
          >
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 2 }}
              onClick={() => handleView("si")}
            >
              No
            </motion.div>
          </Typography>
        </Grid>
        <Grid>
          <Typography
            variant="h3"
            sx={{ color: desition ? "text.disabled" : "primary.main", cursor: "pointer" }}
          >
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 2 }}
              onClick={() => handleView("no")}
            >
              Si
            </motion.div>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
