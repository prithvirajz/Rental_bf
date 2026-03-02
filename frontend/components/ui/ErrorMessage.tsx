import { AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ErrorMessageProps {
    message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
    if (!message) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg mb-4"
        >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{message}</span>
        </motion.div>
    );
}
