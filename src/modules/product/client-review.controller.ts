import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { RequestUser } from "src/common/types/requestUser.type";
import { CreateClientReviewDTO } from "./dto/create-client-review.dto";
import { UpdateClientReviewDTO } from "./dto/update-client-review.dto";

@Controller("client-review")
export class ClientReviewController {
  constructor(private readonly productService: ProductService) {}
  @Post()
  createClientReview(
    @CurrentUser() user: RequestUser,
    @Query("product_id") productId: string,
    @Body() createClientReviewDTO: CreateClientReviewDTO
  ) {
    return this.productService.createClientReview({
      ...createClientReviewDTO,
      clientId: user.userId,
      productId,
    });
  }
  @Delete(":id")
  deleteClientReview(@Param("id") id: string) {
    return this.productService.deleteClientReview(id);
  }
  @Patch(":id")
  updateClientReview(
    @Param("id") id: string,
    @Body() updateClientReviewDTO: UpdateClientReviewDTO
  ) {
    return this.productService.updateClientReview(id, updateClientReviewDTO);
  }
}
