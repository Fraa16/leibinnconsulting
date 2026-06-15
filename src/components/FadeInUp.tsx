import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInUpProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export const FadeInUp = ({ children, delay = 0, className = "" }: FadeInUpProps) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
      delay,
    }}
    viewport={{ once: true }}
    className={className}
  >
    {children}
  </motion.div>
);
