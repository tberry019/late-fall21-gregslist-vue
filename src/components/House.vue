<template>
  <div class="listing">
    <router-link
      :to="{ name: 'HouseDetails', params: { id: house.id } }"
      :title="house.bedrooms"
    >
      <div class="card selectable text-dark">
        <div class="position-relative w-100">
          <div class="gradient">
            <div
              class="position-absolute clip-text"
              style="bottom: 1rem; left: 1rem; z-index: 1"
            >
              <b class="text-white f-20"
                >{{ house.bedrooms }} {{ house.bathrooms }} {{ house.year }}</b
              >
            </div>
            <img
              :src="house.imgUrl"
              alt="listing image"
              class="rounded w-100"
            />
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { House } from "../models/House.js";
import { housesService } from "../services/HousesService.js";
import Pop from "../utils/Pop.js";
export default {
  props: {
    house: { type: House, required: true },
  },
  setup() {
    return {
      editable,
      async handleSubmit() {
        try {
          if (editable.value.id) {
            await housesService.editHouse(editablke.value);
            Modal.getOrCreateInstance(
              document.getElementById("edit-modal")
            ).hide();
          } else {
            await housesService.createHouse(editable.value);
            Modal.getOrCreateInstance(
              document.getElementById("create-house")
            ).hide();
          }
        } catch (error) {
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>

<style>
.gradient:after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(
    180deg,
    hsla(0, 0%, 0%, 0),
    hsla(0, 0%, 0%, 0),
    hsla(0, 0%, 0%, 0.35),
    hsla(0, 0%, 0%, 1)
  );
}
</style>