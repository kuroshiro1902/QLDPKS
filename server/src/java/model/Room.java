package model;
public class Room {
    private int id;
    private String name;
    private String type;
    private double price;
    private int isFree;

    public Room(int id, String name, String type, double price, int isFree) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.price = price;
        this.isFree = isFree;
    }

    // Getter và Setter cho các thuộc tính

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getIsFree() {
        return isFree;
    }

    public void setIsFree(int isFree) {
        this.isFree = isFree;
    }

    // Phương thức toString() để hiển thị thông tin của đối tượng Room

    @Override
    public String toString() {
        return "Room{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", type='" + type + '\'' +
                ", price=" + price +
                ", isFree=" + isFree +
                '}';
    }
}
