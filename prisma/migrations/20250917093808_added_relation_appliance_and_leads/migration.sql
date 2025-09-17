-- AddForeignKey
ALTER TABLE "public"."Appliance" ADD CONSTRAINT "Appliance_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "public"."Lead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
