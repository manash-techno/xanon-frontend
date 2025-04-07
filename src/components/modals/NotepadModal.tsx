import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { ReactImage } from "../ui/ReactImage";
import { ReactButton } from "../ui/ReactButton";
import { AssetsConfig } from "@/config/assetsConfig";
import { Label } from "../ui/Label";
import { Textarea } from "../ui/Textarea";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import Image from "next/image";
// import { Button } from "./ui/button";

export const NotepadModal = ({ showNotepadModal, setShowNotepadModal }: { showNotepadModal: boolean, setShowNotepadModal: (value: boolean) => void }) => (
    <Dialog open={showNotepadModal} onOpenChange={setShowNotepadModal}>
        <DialogContent className="sm:max-w-[528px] p-0 gap-0 max-h-[598px] overflow-auto">
            <DialogHeader className="p-4 pb-0">
                <DialogTitle className="flex justify-between items-center font-bold text-2xl">
                    Notepad
                </DialogTitle>
            </DialogHeader>
            <div className="p-4 space-y-4">
                <div><span>Jul 25, 24</span>  <span className="text-[#6E8091]">11:22 AM</span></div>
                <div className="flex">203-4886959-8683560 <ReactImage src={AssetsConfig.icons.rightUp.src} width={24} height={24} alt={AssetsConfig.icons.rightUp.alt} /></div>
                <div className="flex items-start space-x-4">
                    <ReactImage src={AssetsConfig.icons.defaultProductImage.src} width={60} height={60} alt={AssetsConfig.icons.defaultProductImage.alt} />
                    <div>
                        <div>Schwarzkopf Silhouette Super Hold Hairspray 300ml</div>
                        <div className="text-sm text-[#6E8091]">3V-YU78-8UOF</div>
                        <div className="text-sm text-[#6E8091]">B007OTJ4D4</div>
                    </div>
                </div>
                <div className="flex justify-between w-[360px]">
                    <div>
                        <div>New</div>
                        <div className="text-sm text-[#6E8091]">Beauty</div>
                    </div>
                    <div>
                        <div>Pending</div>
                        <div className="text-sm text-[#6E8091]">Amazon.uk</div>
                    </div>
                    <div>
                        <div>1</div>
                        <div className="text-sm text-[#6E8091]">Customer Order</div>
                    </div>
                </div>
                <div className="w-40">
                    <div className="flex justify-between">
                        <span>Sales</span>
                        <span>£9.40</span>
                    </div>
                    <div className="flex justify-between text-[#6E8091] text-sm">
                        <span>Profit</span>
                        <span>£1.37</span>
                    </div>
                    <div className="flex justify-between text-[#6E8091] text-sm">
                        <span>ROI</span>
                        <span>45.67%</span>
                    </div>
                    <div className="flex justify-between text-[#6E8091] text-sm">
                        <span>Margin</span>
                        <span>£0.44</span>
                    </div>
                    <div className="flex justify-between text-[#6E8091] text-sm">
                        <span>VAT</span>
                        <span>15.90%</span>
                    </div>
                    <div className="flex justify-between text-[#6E8091] text-sm">
                        <span>Fees</span>
                        <span>£0.44</span>
                    </div>
                </div>
                <div>
                    <Label htmlFor="description" className="text-xs">Notepad</Label>
                    <Textarea id="description" placeholder="Description" className="mt-1 h-[120px]" />
                </div>
                <div className="flex space-x-2 pt-2">
                    <ReactButton variant="ghost" onClick={() => setShowNotepadModal(false)} className="text-xs font-medium w-[100px] h-9 bg-[#F5F5F5] dark:bg-[#292929] cursor-pointer">Save</ReactButton>
                    <ReactButton variant="ghost" onClick={() => setShowNotepadModal(false)} className="text-xs font-medium text-[#6E8091] w-[86px] h-9 cursor-pointer">Cancel</ReactButton>
                </div>
            </div>
        </DialogContent>
    </Dialog>
)