package JC;

import java.sql.*;

public class CrudWithJDBC {

    // Method to establish a database connection
    public static Connection getConnection() {
        Connection connection = null;
        try {
            // Load the MySQL JDBC driver
            Class.forName("com.mysql.cj.jdbc.Driver"); // Ensures the JDBC driver is loaded

            // Replace with your database details
            String url = "jdbc:mysql://localhost:3306/chandra";
            String user = "root";
            String password = "Karravula2001@@";

            connection = DriverManager.getConnection(url, user, password);
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
        }
        return connection;
    }

    // Create Operation
    public static void createRecord(String name, int age) {
        String query = "INSERT INTO users (name, age) VALUES (?, ?)";
        try (Connection connection = getConnection();
             PreparedStatement statement = connection.prepareStatement(query)) {

            statement.setString(1, name);
            statement.setInt(2, age);
            statement.executeUpdate();

            System.out.println("Record inserted successfully.");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Read Operation
    public static void readRecords() {
        String query = "SELECT * FROM users";
        try (Connection connection = getConnection();
             Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery(query)) {

            while (resultSet.next()) {
                System.out.println("ID: " + resultSet.getInt("id"));
                System.out.println("Name: " + resultSet.getString("name"));
                System.out.println("Age: " + resultSet.getInt("age"));
                System.out.println("--------------------------");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Update Operation
    public static void updateRecord(int id, String newName, int newAge) {
        String query = "UPDATE users SET name = ?, age = ? WHERE id = ?";
        try (Connection connection = getConnection();
             PreparedStatement statement = connection.prepareStatement(query)) {

            statement.setString(1, newName);
            statement.setInt(2, newAge);
            statement.setInt(3, id);
            statement.executeUpdate();

            System.out.println("Record updated successfully.");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Delete Operation
    public static void deleteRecord(int id) {
        String query = "DELETE FROM users WHERE id = ?";
        try (Connection connection = getConnection();
             PreparedStatement statement = connection.prepareStatement(query)) {

            statement.setInt(1, id);
            statement.executeUpdate();

            System.out.println("Record deleted successfully.");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Main method to test CRUD operations
    public static void main(String[] args) throws ClassNotFoundException,SQLException {
        // Create a record
        createRecord("John Doe", 30);

        // Read records
        readRecords();

        // Update a record
        updateRecord(1, "Jane Doe", 28);
        updateRecord(1, "chandra", 20);

        // Delete a record
        deleteRecord(1);
    }
}
