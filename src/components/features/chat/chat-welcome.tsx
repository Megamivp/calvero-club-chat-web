"use client";

import { MessageSquare, Users, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/primitives/card";
import { motion } from "framer-motion";
import { CreateRoomDialog } from "./dialogs/create-room-dialog";
import { JoinRoomDialog } from "./dialogs/join-room-dialog";

export function ChatWelcome() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex w-full flex-1 items-center justify-center p-4 md:p-8">
        <motion.div
          className="max-w-md space-y-4 text-center md:space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 md:h-16 md:w-16"
            variants={itemVariants}
            whileHover={{
              scale: 1.1,
              rotate: 360,
              transition: { duration: 0.5 },
            }}
          >
            <MessageSquare className="h-6 w-6 text-primary md:h-8 md:w-8" />
          </motion.div>

          <motion.div className="space-y-2" variants={itemVariants}>
            <h1 className="text-xl font-bold md:text-2xl">Welcome to Chat</h1>
            <p className="text-sm text-muted-foreground md:text-base">
              Select a chat room from the sidebar to start messaging, or create
              a new room to begin conversations.
            </p>
          </motion.div>

          <motion.div className="grid gap-3 md:gap-4" variants={itemVariants}>
            <CreateRoomDialog asChild>
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="cursor-pointer"
              >
                <Card className="transition-colors hover:bg-accent/50">
                  <CardHeader>
                    <CardTitle className="mx-auto flex items-center text-center text-base md:text-lg">
                      <Plus className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                      Create Room
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      Start your own chat room and invite others to join the
                      conversation.
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            </CreateRoomDialog>

            <JoinRoomDialog asChild>
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="cursor-pointer"
              >
                <Card className="transition-colors hover:bg-accent/50">
                  <CardHeader>
                    <CardTitle className="mx-auto flex items-center text-center text-base md:text-lg">
                      <Users className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                      Join Room
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      Enter a room ID to join an existing conversation with
                      others.
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            </JoinRoomDialog>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
