import React from 'react';
import { Box } from './Box';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <Box className={`bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden ${className}`}>
      {children}
    </Box>
  );
};

const CardHeader: React.FC<CardProps> = ({ children, className = "" }) => (
  <Box className={`p-4 border-b border-slate-100 ${className}`}>{children}</Box>
);

const CardContent: React.FC<CardProps> = ({ children, className = "" }) => (
  <Box className={`p-4 ${className}`}>{children}</Box>
);

const CardFooter: React.FC<CardProps> = ({ children, className = "" }) => (
  <Box className={`p-4 border-t border-slate-100 bg-slate-50/50 ${className}`}>{children}</Box>
);

export { Card, CardHeader, CardContent, CardFooter };
