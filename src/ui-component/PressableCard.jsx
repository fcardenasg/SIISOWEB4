import { motion } from 'framer-motion';

const PressableCard = ({
    children,
    springConfig = { damping: 25, stiffness: 400 },
    contentHoverScale = 1.02,
    contentTapScale = 0.95,
    style,
    ...props
}) => {
    const scaleTransition = {
        type: "spring",
        ...springConfig,
    };

    return (
        <motion.div
            style={style}
            {...props}
        >
            <div className='w-full h-full'>
                <motion.div
                    className='w-full h-full'
                    style={{ originX: 0.5, originY: 0.5 }}
                    whileHover={{ scale: contentHoverScale }}
                    whileTap={{ scale: contentTapScale }}
                    transition={scaleTransition}
                >
                    {children}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default PressableCard;