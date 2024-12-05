import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import {
  Block,
  BLOCK_TYPE_BACKEND_CMD,
  BLOCK_TYPE_DESCRIPTIONS,
  BlockTypes,
} from "../../../../store/types";
import "./BlockButton.css";
import NotionIcon from "../../../../components/icons/NotionIcon";
import useAppStore from "../../../../store/store";
import TrashIcon from "../../../../components/icons/TrashIcon";
import EditIcon from "../../../../components/icons/EditIcon";
import { remove, BaseDirectory } from "@tauri-apps/plugin-fs";
import { getImage } from "../../../../helpers/images";
import VSCodeLogo from "../../../../components/icons/VSCodeLogo";
import BlenderLogo from "../../../../components/icons/BlenderLogo";
import Stack from "../../../../components/Stack/Stack";
import GlassButton from "../../../../components/GlassButton";
import { motion, Variants } from "motion/react";

const baseTransition = {
  duration: 1,
};
const blockAnimations: Variants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: { when: "beforeChildren", ...baseTransition },
  },
  hidden: {
    opacity: 0,
    y: 100,
    transition: { when: "afterChildren", ...baseTransition },
  },
};

const BLOCK_TYPE_ICONS: Record<BlockTypes, (props: any) => JSX.Element> = {
  vscode: VSCodeLogo,
  blender: BlenderLogo,
};

type Props = { block: Block };

const BlockButton = ({ block }: Props) => {
  const {
    editMode,
    removeBlock,
    setEditBlockId,
    projectSidebar,
    toggleProjectSidebar,
    updateBlock,
  } = useAppStore();
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const getImageAndSave = async () => {
      const newImageSrc = await getImage(block.image);
      setImageSrc(newImageSrc);
    };
    if (block.image) getImageAndSave();
  }, [block]);

  const handleProject = (block: Block) => async () => {
    // Run block's action based on it's "type"
    await invoke(BLOCK_TYPE_BACKEND_CMD[block.type], { name: block.command });

    // Update the block as recently used
    updateBlock(block.id, {
      last_opened: Date.now(),
    });
  };
  const handleRemoveBlock = async () => {
    const shouldDelete = await confirm(
      `Do you want to delete block: ${block.name}?`
    );
    if (shouldDelete) deleteBlock();
  };

  const deleteBlock = () => {
    removeBlock(block.id);
    // Delete image from disk
    remove(block.image, {
      baseDir: BaseDirectory.AppLocalData,
    });
  };

  const handleEditBlock = () => {
    // Set this block as currently editing
    setEditBlockId(block.id);
    // Open the sidebar
    if (!projectSidebar) toggleProjectSidebar();
  };

  const BlockTypeIcon = BLOCK_TYPE_ICONS[block.type];

  return (
    <motion.div
      className="BlockButton"
      variants={blockAnimations}
      initial="hidden"
      animate="visible"
      exit="hidden"
      layout
      // transition={{ duration: 6, ease: "ease-in" }}
    >
      <div
        className="content"
        onClick={editMode ? undefined : handleProject(block)}
        title={BLOCK_TYPE_DESCRIPTIONS[block.type]}
      >
        {block.image && (
          <div className="imageContainer">
            <div
              className="image"
              style={{ backgroundImage: `url(${imageSrc})` }}
            />
          </div>
        )}
        <div className="metadata">
          <Stack gap="12px">
            <BlockTypeIcon width="20px" height="20px" />
            <h3>{block.name}</h3>
          </Stack>
          <h5>{block.command}</h5>
        </div>
      </div>
      {block.notion != "" && (
        <a
          href={`notion://${block.notion}`}
          className="NotionIcon"
          title="Open notes in Notion desktop app"
        >
          <NotionIcon width={24} height={24} />
        </a>
      )}
      {editMode && (
        <div className="controls">
          <GlassButton title="Edit Block" onClick={handleEditBlock}>
            <EditIcon width={18} height={18} />
          </GlassButton>
          <GlassButton title="Remove Block" onClick={handleRemoveBlock}>
            <TrashIcon width={18} height={18} />
          </GlassButton>
        </div>
      )}
    </motion.div>
  );
};

export default BlockButton;
