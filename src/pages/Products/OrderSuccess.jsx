import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaSeedling,
  FaCarrot,
  FaAppleAlt,
  FaIndustry,
  FaFlask,
  FaCheckCircle,
  FaNetworkWired,
  FaTruck,
} from "react-icons/fa";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((s) => (s < 4 ? s + 1 : s));
    }, 1800);

    const redirect = setTimeout(() => {
      navigate("/myOrder");
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(redirect);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center 
                    bg-gradient-to-b from-emerald-50 to-white px-4">

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl md:text-2xl font-medium text-emerald-700 mb-14"
      >
        From nature to you — carefully prepared
      </motion.h2>

      {/* Pipeline */}
      <div className="relative w-full max-w-6xl flex items-center justify-between">

        {/* FIELD */}
        <Stage
          active={stage >= 0}
          title="Farms"
          icon={<FaSeedling />}
        >
          <FloatingItem active={stage >= 0} icon={<FaCarrot />} />
          <FloatingItem active={stage >= 0} icon={<FaAppleAlt />} delay={0.4} />
        </Stage>

        <Connector active={stage >= 1} />

        {/* FACTORY */}
        <Stage
          active={stage >= 1}
          title="Manufacturing"
          icon={<FaIndustry />}
        >
          <MovingMaterial active={stage >= 1} />
        </Stage>

        <Connector active={stage >= 2} />

        {/* LAB */}
        <Stage
          active={stage >= 2}
          title="Lab Testing"
          icon={<FaFlask />}
        >
          {stage >= 2 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-emerald-600 text-lg"
            >
              <FaCheckCircle />
            </motion.div>
          )}
        </Stage>

        <Connector active={stage >= 3} />

        {/* NETWORK */}
        <Stage
          active={stage >= 3}
          title="Distribution"
          icon={<FaNetworkWired />}
        />

        <Connector active={stage >= 4} />

        {/* DELIVERY */}
        <Stage
          active={stage >= 4}
          title="On the way"
          icon={<FaTruck />}
        />
      </div>
    </div>
  );
}

/* ───────────────── Components ───────────────── */

const Stage = ({ icon, title, active, children }) => (
  <div className="flex flex-col items-center relative w-20 md:w-28">
    <motion.div
      animate={{
        scale: active ? 1 : 0.85,
        opacity: active ? 1 : 0.3,
      }}
      className="w-14 h-14 md:w-16 md:h-16 rounded-full 
                 bg-emerald-600 text-white 
                 flex items-center justify-center text-xl shadow-md"
    >
      {icon}
    </motion.div>

    <span className="mt-3 text-xs md:text-sm text-slate-700 text-center">
      {title}
    </span>

    <div className="absolute top-full mt-2">
      {children}
    </div>
  </div>
);

const Connector = ({ active }) => (
  <motion.div
    animate={{ opacity: active ? 1 : 0.2 }}
    className="flex-1 h-[2px] bg-emerald-400 mx-2 md:mx-4"
  />
);

/* Floating vegetables from field */
const FloatingItem = ({ icon, active, delay = 0 }) => (
  <motion.div
    initial={{ y: 10, opacity: 0 }}
    animate={
      active
        ? { y: [-5, 5, -5], opacity: 1 }
        : { opacity: 0 }
    }
    transition={{
      repeat: Infinity,
      duration: 2,
      delay,
    }}
    className="text-emerald-700 text-sm absolute"
  >
    {icon}
  </motion.div>
);

/* Material moving inside factory */
const MovingMaterial = ({ active }) => (
  <motion.div
    initial={{ x: -10, opacity: 0 }}
    animate={
      active
        ? { x: [0, 12, 0], opacity: 1 }
        : { opacity: 0 }
    }
    transition={{ repeat: Infinity, duration: 1.5 }}
    className="w-3 h-3 bg-emerald-300 rounded-full"
  />
);
