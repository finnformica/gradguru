"use client";

import { Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      duration: 1,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const childrenVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", duration: 1, bounce: 0.6 },
  },
};

type NotFoundAnimationProps = {
  relocatedPageName: string;
  href: string;
};

const NotFoundAnimation = ({
  relocatedPageName,
  href,
}: NotFoundAnimationProps) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      style={{
        width: "400px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        height: "80vh",
        margin: "auto",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <motion.div variants={childrenVariants}>
        <Typography variant="h4">Sorry, Page Not Found!</Typography>
      </motion.div>
      <motion.div variants={childrenVariants}>
        <Typography color={"text.secondary"}>
          Sorry, we couldn't find the page you're looking for. <br />
          Perhaps you've mistyped the URL? Be sure to <br />
          check your spelling.
        </Typography>
      </motion.div>
      <motion.div variants={childrenVariants}>
        <Image
          src={"/imgs/3d/man-with-laptop.svg"}
          height={300}
          width={300}
          alt="man with laptop"
          style={{ margin: "0 auto", paddingLeft: 45 }}
        />
      </motion.div>
      <motion.div variants={childrenVariants}>
        <Button variant="contained" href={href}>
          Go to {relocatedPageName}
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default NotFoundAnimation;
