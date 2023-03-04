import { motion } from "framer-motion";

export default function Caret() {
  return (
    <motion.div
      aria-hidden={true}
      className="inline-block h-5 w-0.5 bg-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.75, repeat: Infinity, repeatType: "reverse" }}
    />
  );
}
